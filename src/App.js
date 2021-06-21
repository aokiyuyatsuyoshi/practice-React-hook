import './App.css';
import React,{useState,useEffect}from 'react';
import {db}from "./firebase";
import { FormControl, TextField ,List} from '@material-ui/core';
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos"
import TaskItem from './TaskItem';
import {auth} from "./firebase";
import ExitToAppIcon from "@material-ui/icons";

const App:React.FC = (props) => {
  ///これhooks（状態にはuseStateを使用）
  const [tasks,setTasks] = useState([{id:"",title:""}]);
  ///inputの状態
  const [input,setInput] = useState("")

  useEffect(()=>{
    const unsub = auth.onAuthStateChanged((user)=>{
      !user && props.history.push("/login");
    });
    return ()=> unsub();
  })

  ///useEffectのアロー関数
  useEffect(()=>{
    ///データベースからスナップショットを作成し、抽出してくる
    const unSub = db.collection("tasks").onSnapshot((snapshot)=>{
      setTasks(
        snapshot.docs.map((doc)=>({id:doc.id,title:doc.data().title}))
        );
      
    })
    return ()=>unSub();
  },[]);

  const newTask = (e)=>{
    db.collection("tasks").add({title:input});
    setInput("")
  }
  return (
    <div className="App">
      <h1>Todoアプリケーション</h1>
      <FormControl>
        <TextField label = "New Task" value={input} onChange={(e)=>setInput(e.target.value)}/>
      </FormControl>
      <button disabled={!input} onClick = {newTask}>
        <AddToPhotosIcon></AddToPhotosIcon>

      </button>

      <List>
              {tasks.map((task)=>
              <TaskItem id = {task.id} title = {task.title} key = {task.id}></TaskItem>
      )}
      </List>

    </div>
  );
}

export default App;
