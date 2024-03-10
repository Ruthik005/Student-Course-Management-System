const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on the port number ${PORT}`));

//Configuration (MONGODB)
var curl = "mongodb://localhost:27017";
var client = new MongoClient(curl); 
const ROLES = {
    STUDENT: 'student',
    FACULTY: 'faculty',
    ADMIN: 'admin'
  };
function checkRole(role) {
    return (req, res, next) => {
      const userRole = req.user.role;
      if (userRole === role) {
        next();
      } else {
        res.status(403).json({ error: 'Unauthorized' });
      }
    };
  }
//TESTING
app.get('/klef/test', async function(req, res){
    //res.send("Koneru Lakshmaiah Education Foundation");
    res.json("Koneru Lakshmaiah Education Foundation");
});

app.post('/klef/cse', async function(req, res){
    res.json(req.body);
    //res.json("Computer Science and Engineering");
});

//REGISTRATION MODULE
app.post('/registration/signup', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('MSWDProject');
        users = db.collection('users');
        data = await users.insertOne(req.body);
        conn.close();
        res.json("Registered successfully...");
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//LOGIN MODULE
app.post('/login/signin', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('MSWDProject');
        users = db.collection('users');
        data = await users.count(req.body);
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//HOME MODULE
app.post('/home/uname', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('MSWDProject');
        users = db.collection('users');
        data = await users.find(req.body, {projection:{firstname: true, lastname: true}}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

app.post('/home/menu', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('MSWDProject');
        menu = db.collection('menu');
        data = await menu.find({}).sort({mid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

app.post('/home/menus', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('MSWDProject');
        menus = db.collection('menus');
        data = await menus.find(req.body).sort({smid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//CHANGE PASSWORD
app.post('/cp/updatepwd', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('MSWDProject');
        users = db.collection('users');
        data = await users.updateOne({emailid : req.body.emailid}, {$set : {pwd : req.body.pwd}});
        conn.close();
        res.json("Password has been updated");
    }catch(err)
    {
        res.json(err).status(404);
    }
});
app.post("/forgot-password",async (req,res)=>{
    const {email}=req.body;
    try{
        const oldUser = await UserActivation.findOne({email});
        if(!oldUser){
            return res.send("User Not Exists!!");
        }
        const secret =JWT_SCERT + oldUser.password;
        const token = jwt.sign({email:oldUser.email,id:oldUser._id},secret,{
            expiresIn:"5m",
        });
        const link='http://localhost:5000/reset-password/${oldUser._id}/${token}';
        console.log(link);
    }catch(error){}
});

app.post('/reset-password',async (req,res)=>{
    const {id,token}=req.params;
    console.log(req.params);
})
// Faculty Menu
app.post('/fmenu', async function(req, res){
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDProject');
        const fmenu = db.collection('fmenu'); // Assuming 'fmenu' is the collection name for faculty menu items
        const data = await fmenu.find({}).sort({mid: 1}).toArray();
        conn.close();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Faculty Menus
app.post('/fmenus', async function(req, res){
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDProject');
        const fmenus = db.collection('fmenus'); // Assuming 'fmenus' is the collection name for faculty submenus
        const data = await fmenus.find(req.body).sort({smid: 1}).toArray();
        conn.close();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Admin Menu
app.post('/amenu', async function(req, res){
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDProject');
        const amenu = db.collection('amenu'); // Assuming 'amenu' is the collection name for admin menu items
        const data = await amenu.find({}).sort({mid: 1}).toArray();
        conn.close();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Admin Menus
app.post('/amenus', async function(req, res){
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDProject');
        const amenus = db.collection('amenus'); // Assuming 'amenus' is the collection name for admin submenus
        const data = await amenus.find(req.body).sort({smid: 1}).toArray();
        conn.close();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.post('/book/addnewcourse', async function(req, res){
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDProject');
        const courses = db.collection('addnewcourse');
        const data = await courses.insertOne(req.body);
        conn.close();
        res.json("Course added successfully...");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.post('/myprofile/info', async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDProject');
        const users = db.collection('users');
        const userData = await users.findOne({ emailid: req.body.emailid });
        conn.close();
        
        if (userData) {
            res.json([userData]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// VIEW COURSES
app.get('/viewcourses', async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDProject');
        const courses = db.collection('addnewcourse');
        const courseData = await courses.find().toArray();
        conn.close();
        if (courseData.length > 0) {
            res.json(courseData);
        } else {
            res.status(404).json({ error: 'No courses found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// routes for different roles
// Faculty 
app.post('/facultypage', checkRole(ROLES.FACULTY), async function (req, res) {
    try {
        // Logic specific to faculty 
        res.json({ message: 'Welcome to Faculty ' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Admin 
app.post('/adminpage', checkRole(ROLES.ADMIN), async function (req, res) {
    try {
        // Logic specific to admin page
        res.json({ message: 'Welcome to Admin ' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// ADD COURSE(student for fetching)
app.get('/coursenames', async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDProject');
        const courses = db.collection('addnewcourse');
        // Projection to include additional fields besides courseName
        const courseData = await courses.find({}, { projection: { _id: 0, courseName: 1, sectionNumber: 1, facultyName: 1, semester: 1, year: 1 } }).toArray();
        conn.close();
        if (courseData.length > 0) {
            res.json(courseData);
        } else {
            res.status(404).json({ error: 'No courses found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//posting add course of student to database 
app.post('/addcourse', async function(req, res){
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDProject');
        const courses = db.collection('addcourse');
        const data = await courses.insertOne(req.body);
        conn.close();
        res.json("Course added successfully...");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// DELETE COURSE(Admin Module)
app.delete('/deletecourse', async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDProject');
        const courses = db.collection('addnewcourse');
        const { courseName } = req.body;
        const result = await courses.deleteOne({ courseName: courseName });
        conn.close();
        if (result.deletedCount > 0) {
            res.json({ alert: 'Course deleted successfully' });
        } else {
            res.status(404).json({ error: 'Course not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//AddStudent(Faculty Modules)
app.post('/addstudent', async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDProject');
        const students = db.collection('Addstudent');
        const data = await students.insertOne(req.body);
        conn.close();
        res.json("Student added successfully...");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//View Students(Faculty Module)
app.get('/viewstudents', async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDProject');
        const students = db.collection('Addstudent');
        const data = await students.find({}).toArray();
        conn.close();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//View Faculty(Admin Module)
app.get('/api/faculty', async (req, res) => {
    try {
      const conn = await client.connect();
      const db = conn.db('MSWDProject');
      const users = db.collection('users');
      const facultyData = await users.find({ role: 'faculty' }).toArray();
      conn.close();
      res.json(facultyData);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.get('/studentcourse', async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDProject');
        const courses = db.collection('addcourse');
        const courseData = await courses.find().toArray();
        conn.close();

        if (courseData.length > 0) {
            res.json(courseData);
        } else {
            res.status(404).json({ error: 'No courses found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
