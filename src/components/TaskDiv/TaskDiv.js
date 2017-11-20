import React,{Component} from "react";
import $ from "jquery";
import "./css/TaskDiv.css";
export default class TaskDiv extends Component{
    constructor(props){
        super(props);
        this.editTask = this.editTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.selectTask = this.selectTask.bind(this);
    };
    editTask(){
        // return taskId to parent methon for updating element
        this.props.editeTask(this.props.task.taskStr,this.props.task.taskId);
    };
    deleteTask(){
        // return taskId to parent methon for deleting element 
        this.props.deleteId(this.props.task.taskId);
    }
    selectTask(){
        if($("#check"+this.props.task.taskId).prop("checked")){
            this.props.selectTask(this.props.task.taskId,true);
            $("#"+this.props.task.taskId).css("text-decoration","line-through");
        }else if(!$("#check"+this.props.task.taskId).prop("checked")){
            this.props.selectTask(this.props.task.taskId,false);
            $("#"+this.props.task.taskId).css("text-decoration","none");
        }
    }
    render(){
        return(
            <div className="singleTask animated bounceInDown">
                <input type="checkbox" id={"check"+this.props.task.taskId} onClick={this.selectTask}/>
                <p className="task-name" id={this.props.task.taskId}>{this.props.task.taskStr}</p>
                <span className="actions">
                    <span className="glyphicon glyphicon-pencil edit" onClick={this.editTask}></span>
                    <span className="glyphicon glyphicon-trash delete" onClick={this.deleteTask}></span>
                </span>
            </div>
        );
    };
}