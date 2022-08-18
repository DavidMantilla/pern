const pool = require("../db");

const getAllTasks = async (req, res, next) => {
   try {
	const result = await pool.query(
	      "select * from task",
	      
	    );
	     res.json(result.rows);
	   
} catch (error) {
	 next(error);
}
}
const getTask = async (req, res,next) => {
    try {
      const  { id }= req.params;
      const result = await pool.query("select * from task where id=$1", [id,]);
        if (result.rows.length === 0)
             return res.status(404).json({message: "tarea no encontrada"});
    
      return res.json(result.rows);
    } catch (error) {
       next(error);
    }
  
  
};

const deleteTask = async (req, res,next) => {
   const { task } = req.params;
 const result = await pool.query("DELETE FROM task where id=$1 RETURNING *", [
   task,
 ]);
 try {
  if (result.rowCount==0)
 return res.status(404).json({  messages:"Tarea no se encuentra" });
 return res.sendStatus(204);
 } catch (error) {
   next(error);
 }

};

const createTask = async (req, res,next) => {
  const {title,description}= req.body;
  try {
    const result = await pool.query(
      "insert into task (title,description) values($1,$2) RETURNING *",
      [title, description]
    );

    res.json(result.rows[0]);
  } catch (error) {
     next(error);
    
  }
  
};
const updaeTask = async (req, res,next) => {
   const { id } = req.params;
 const { title, description } = req.body;
  try {
    const result = await pool.query(
      "update task  set title=$1,description=$2  where id= $3 RETURNING *",
      [title, description,id]
    );
  if (result.rowCount == 0)
    return res.status(404).json({ messages: "Tarea no se encuentra" });
   return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }

};


module.exports = { getAllTasks, getTask, createTask, deleteTask, updaeTask };
