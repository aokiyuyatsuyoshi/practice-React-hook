import React ,{useState,useEffect}from 'react';
import {Button,FormControl,TextField,Typography} from "@material-ui/core";
import {auth} from "./firebase";

const Login:React.FC= (props:any) => {
    const [isLogin,setIsLogin] = useState(true);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            user && props.history.push("/");
        })
    },[props.history]);
        return (
        <div>
            <h1>
                {isLogin? "Login":"REGISTORY"}
            </h1>
             <br>
                </br>
                    <FormControl>
                        <TextField name = "email" label ="E-mail" value={email} onChange={(e)=>{setEmail(e.target.value);}}>
                        </TextField>
                    </FormControl>
                     <br></br>
                        <FormControl>
                            <TextField name = "password" label ="password" value={password} onChange={(e)=>{setPassword(e.target.value);}}>
                            </TextField>
                        </FormControl>
                    <br></br>
                        <Button variant = "contained" color = "primary" size = "small" onClick ={
                            isLogin? async () =>{
                                try{
                                    await auth.signInWithEmailAndPassword(email,password);
                                    props.history.push("/")
                                }catch(e){
                                    alert(e.message)
                                }
                            }: async () =>{
                                try{
                                    await auth.createUserWithEmailAndPassword(email,password);
                                    props.history.push("/");
                                }catch(e){
                                    alert(e.message);
                                }
                            }
                        }>
                            Login
                        </Button>
                        <br></br>
                        <Typography align="center">
                            <span onClick={()=>setIsLogin(!isLogin)}>
                                {isLogin? "Create New Account?":"Back to Login"}
                            </span>
                        </Typography>

                
        </div>
    )
}

export default Login
