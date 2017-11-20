import React, {Component} from "react";
import $ from "jquery";
import "./css/TodoCss.css";
import TaskDiv from "./../TaskDiv/TaskDiv";

export default class TodoDiv extends Component{
    constructor(props){
        super(props);
        this.addTaskToView = this.addTaskToView.bind(this);
        this.deleteSingleTaskView = this.deleteSingleTaskView.bind(this);
        this.editSingleTask = this.editSingleTask.bind(this);
        this.selectTaskId = this.selectTaskId.bind(this);
        this.deleteAllSelectedTasks = this.deleteAllSelectedTasks.bind(this);
        this.state = {
            tasks:[],
            multiSelection:false
        };
        this.taskId = 0;
    };
    // function for adding and updating state values
    addTaskToView(){
        //check for text input
        if($("#task_str").val() !== ""){
            //check condition for this attribute to take action for update and add data to state
            if($("#task_str").attr("data-update") === "true"){
                let tempTasks = this.state.tasks;//assign copy to temporary variable
                let targetObjId = Number($("#task_str").attr("data-targetObj").toString());//for index number of tasks obj
                if(!Number.isNaN(targetObjId)){
                    let indexNumber = tempTasks.findIndex(task=>task.taskId === targetObjId);
                    tempTasks[indexNumber] = {
                        taskId:indexNumber,
                        taskStr: $("#task_str").val().toString()
                    };
                    this.setState({
                        tasks:tempTasks,
                        multiSelection:this.state.multiSelection
                    });
                }else{
                    alert("id not found");
                }
                //after all done clear values and data attributes
                $("#task_str").val('');
                $("#task_str").attr("data-update","false");
                $("#task_str").removeAttr("data-targetObj");
            }else{
                let tasks = this.state.tasks;//same above senerio 
                tasks.push({
                    taskId:this.taskId++,
                    taskStr:$("#task_str").val().toString()
                });//add new task to temporary variable
                this.setState({
                    tasks:tasks,
                    multiSelection:this.state.multiSelection
                });//update state
                //clear text input
                $("#task_str").val('');
            }
        }else{
            //if text not found in text input changing the css and added change function if again enter string and reset again
            $("#task_str").css("border","1px solid red");
            $("#task_str").off("keyup");
            $("#task_str").on("keyup",function(){
                if($(this).val().length > 0){
                    $(this).css("border","none");
                } 
            });
        }
    };
    // function for editing task and updating state values
    editSingleTask(text,id){
        $("#task_str").val(text);//set value 
        $("#task_str").attr("data-update","true");//set requird attribute value to true for update state
        $("#task_str").attr("data-targetObj",id);//set required attribute for ref to which state obj shuld update
    };
    // function for deleting tasks from state
    deleteSingleTaskView(id){
        let tempTasks = this.state.tasks;//temporary variable for changes
        let indexNumber = tempTasks.map(task=>task.taskId === Number(id));
        if(indexNumber !== -1){
            indexNumber.map((condition,i)=>{
                if(condition){
                    tempTasks.splice(i,1);
                }
            });
        }
        this.setState({
            tasks: tempTasks,
            multiSelection:this.state.multiSelection
        });//update
    };

    selectTaskId(id,change){
        if(change){
            let multiIds = $("#task_str").attr("data-multids");
            if(multiIds === ""){
                multiIds = multiIds + id.toString();
            }else{
                multiIds = multiIds + "," + id.toString();
            }
            $("#task_str").attr("data-multids",multiIds);
            this.setState({
                tasks:this.state.tasks,
                multiSelection:true
            });
        }else{
            let multiIds = $("#task_str").attr("data-multids");
            multiIds = multiIds.split(",");
            if(multiIds.length > 1){
                multiIds.splice(id.toString(),1);
                multiIds = multiIds.join(",");
            }else{
                multiIds = "";
                this.setState({
                    tasks:this.state.tasks,
                    multiSelection:false
                });
            }
            $("#task_str").attr("data-multids",multiIds);
        }
    };
    deleteAllSelectedTasks(){
        let stateTasks = this.state.tasks;
        let selectedTasks = $("#task_str").attr("data-multids");
        selectedTasks = selectedTasks.split(",");

        selectedTasks.map(id=>{
            let indexNumber = stateTasks.findIndex(task=>task.taskId === Number(id));
            if(indexNumber !== -1){
                stateTasks.splice(indexNumber,1);
            }
        });
        $("#task_str").attr("data-multids","");
        $("input[type='checkbox']").trigger("click");
        this.setState({
            tasks: stateTasks,
            multiSelection:false
        });//update
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3">
                        <div className="well">
                            <div>
                                <input type="text" id="task_str" placeholder="Enter Task" data-update="false" data-multids=""/>
                                <button id="round-add-btn" onClick={this.addTaskToView}>
                                    +
                                </button>
                            </div>
                            <hr/>
                            {/* Task div show accordingly lenght of state.tasks */}
                            {this.state.tasks.map((task,i)=><TaskDiv key={i} task={task} deleteId = {this.deleteSingleTaskView} editeTask = {this.editSingleTask} selectTask={this.selectTaskId}/>)}
                            {this.state.multiSelection ? <button className="delete-btn-selc animated bounceIn" onClick = {this.deleteAllSelectedTasks}>Delete Selected Tasks</button>:""}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}