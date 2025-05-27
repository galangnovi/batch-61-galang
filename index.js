import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import hbs from 'hbs'
import multer from 'multer'
import { Pool } from 'pg'
 
const db = new Pool({
  user: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  max: 20
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()
const port = 2000

hbs.registerHelper('includes', function (array, value) {
  if (!Array.isArray(array)) return false;
  return array.includes(value);
});

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));
// Daftarkan folder partials
hbs.registerPartials(path.join(__dirname, 'src/views/partials'));


app.use('/assets', express.static('src/assets'))
// app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.post('/form-contact', handleContact)

app.get('/', async (req, res) => {
  
});

app.get('/home', (req, res) => {
  res.render('index')
})


app.get('/form-contact', (req, res) => {
  res.render('form-contact')
})

app.get('/my-project', async (req, res) => {
  const result = await db.query('SELECT * FROM latihan.projects ORDER BY id DESC');
  const projectsRaw = result.rows;

   const techIcons = {
    'Next JS': `<img src="../assets/img/next.png" class="icon-techno">`,
    'Node JS': `<img src="../assets/img/node.png" class="icon-techno">`,
    'React JS': `<img src="/assets/img/react.png" class="icon-techno">`,
    'TypeScript': `<img src="/assets/img/TypeScript.png" class="icon-techno">`
  };

   const projects = projectsRaw.map(project => {
    let technologies = [];
    if (typeof project.technologies === 'string') {
      technologies = project.technologies.replace(/[{}"]/g, '').split(',');
    } else if (Array.isArray(project.technologies)) {
      technologies = project.technologies;
    }
     console.log('Technologies raw:', technologies);
    const techHTML = technologies.map(t => techIcons[t] || '').join(' ');
    console.log('icon', techHTML);
    return { ...project, techHTML };
  });

  res.render('my-project', { projects }); 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function handleContact(req, res) {
  console.log (req.body)
}

// Setup folder publik dan upload
app.use('/uploads', express.static('uploads'));
app.use(express.static('src'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'src/uploads'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

//upload
app.post('/my-project', upload.single("image"), async (req, res) => {
  console.log('Request POST /my-project diterima');
  const { email, start, end, desc, techno } = req.body;
  const tech = Array.isArray(techno)
    ? techno
    : [techno].filter(Boolean); // handle 1 atau lebih checkbox

  const imageURL = req.file ? `/uploads/${req.file.filename}` : null;

  const startDate =new Date(start);
  const endDate = new Date(end);
  const durationMs = endDate - startDate;
  const dayDuration = Math.floor(durationMs / (1000 * 60 * 60 * 24));
  const monthDuration = Math.floor(dayDuration / 30);

  // Insert dan ambil kembali id
  const insertResult = await db.query(
    `INSERT INTO latihan.projects (email, start_date, end_date, description, technologies, image_url, month_duration)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id`,
    [email, startDate, endDate, desc, tech, imageURL, monthDuration]
  );
  const query = 'select * from latihan.projects';
  const results = await db.query(query);
  res.redirect('/my-project')
});


//tampilkan detail proyek dengan id
app.get('/my-project/:id', async (req, res) => {
  const { id } = req.params;
  const result = await db.query('SELECT * FROM latihan.projects WHERE id = $1', [id]); 
  const projectsRaw = result.rows;

   const techIcons = {
    'Next JS': `<div><p><img src="../assets/img/next.png" class="icon-techno"> Next</p></div>`,
    'Node JS': `<div><p><img src="../assets/img/node.png" class="icon-techno"> Node</p></div>`,
    'React JS': `<div><p><img src="/assets/img/react.png" class="icon-techno"> React<p></div>`,
    'TypeScript': `<div><p><img src="/assets/img/TypeScript.png" class="icon-techno"> TypeScript<p></div>`
  };

   const projects = projectsRaw.map(project => {
    let technologies = [];
    if (typeof project.technologies === 'string') {
      technologies = project.technologies.replace(/[{}"]/g, '').split(',');
    } else if (Array.isArray(project.technologies)) {
      technologies = project.technologies;
    }
    const techHTML = technologies.map(t => techIcons[t] || '').join(' ');
    return { ...project, techHTML,
      start_date: new Date(project.start_date).toISOString().slice(0, 10),
      end_date: new Date(project.end_date).toISOString().slice(0, 10),
     };
  });
  res.render('data-project', { projects});
});


//value edit
app.get('/my-project/:id/edit', async (req, res) => {
  const { id } = req.params;
  const result = await db.query('SELECT * FROM latihan.projects WHERE id = $1', [id]);
  const project = result.rows[0];
  project.start_date = project.start_date.toISOString().slice(0, 10);
  project.end_date = project.end_date.toISOString().slice(0, 10);
  res.render('edit-project', { project });
});


//update data
app.post('/my-project/:id/edit', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { email, start, end, desc } = req.body;
  const tech = Array.isArray(req.body.techno)
    ? req.body.techno
    : [req.body.techno].filter(Boolean);
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  const startDate1 =new Date(start);
  const endDate1 = new Date(end);
  const durationMs1 = endDate1 - startDate1;
  const dayDuration1 = Math.floor(durationMs1 / (1000 * 60 * 60 * 24));
  const monthDuration1 = Math.floor(dayDuration1 / 30);

    const query = `
      UPDATE latihan.projects
      SET email = $1,
          start_date = $2,
          end_date = $3,
          description = $4,
          technologies = $5,
          image_url = COALESCE($6, image_url),
          month_duration = $7
      WHERE id = $8
      RETURNING *;
    `;
    const values = [email, startDate1, endDate1, desc, tech, imagePath, monthDuration1,id];
    const result = await db.query(query, values);
    console.log(values)
    res.redirect(`/my-project#projectCard`);
});


//delete
app.post('/my-project/:id/delete', async (req, res) => {
  const { id } = req.params
  const result = await db.query('DELETE FROM latihan.projects WHERE id = $1 RETURNING *', [id]); 
  res.redirect('/my-project#projectCard');
});
