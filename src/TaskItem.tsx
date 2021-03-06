import React ,{useState}from 'react'
import firebase from "firebase/app";
import {ListItem,TextField,Grid} from "@material-ui/core";
import DeleteOutlineOutlineIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { db } from './firebase';


interface PROPS{
    id:string;
    title:string;
}
const TaskItem:React.FC <PROPS>= (props) => {

    const [title,setTitle] = useState(props.title);
    ///データの更新
    const editTask=()=>{
        db.collection("tasks").doc(props.id).set({title:title},{merge:true})
    };

    ///データの削除
    const deleteTask=() =>{
        db.collection("tasks").doc(props.id).delete();
    };
    return (
            <ListItem>
                <h2>
                    {props.title}
                </h2>
                <Grid container justify="flex-end">
                    <TextField label="Edit Task" value={title} onChange={(e)=>setTitle(e.target.value)}>

                    </TextField>
                </Grid>
                <button onClick={editTask}>
                    <EditOutlinedIcon/>
                </button>
                <button onClick={deleteTask}>
                    <DeleteOutlineOutlineIcon/>
                </button>
            </ListItem>
    )
}

export default TaskItem
