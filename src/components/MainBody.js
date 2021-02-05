import React from 'react'
import { Route } from 'react-router'
import DeleteGoal from './DeleteGoal';
import Main from './Main'

import AllGoals from './AllGoals'
import NewTask from './NewTask'


export default function MainBody(props) {


    return (
        <div className="main-body">
            <DeleteGoal completeGoal={props.completeGoal} completedGoal={props.completedGoal} show={props.deleteModalShow} onHide={props.deleteModalClose}  />
            <NewTask  getNewTaskId={props.getNewTaskId} show={props.taskModalShow} onHide={props.taskModalClose} clickedGoalid={props.clickedGoalid} />
            <Route exact path="/" render={() => <Main newResourceId={props.newResourceId} newTaskId={props.newTaskId} taskModalShow={props.taskModalShow} confirmedCompletedGoal={props.confirmedCompletedGoal} taskModalOpen={props.taskModalOpen} loggedinUser={props.loggedinUser} completeTask={props.completeTask} completeTaskids={props.completeTaskids} handleGoalClick={props.handleGoalClick}/>} />
            
            <Route exact path="/goals" render={() => <AllGoals resourceModalOpen={props.resourceModalOpen} taskModalOpen={props.taskModalOpen} loggedinUser={props.loggedinUser} handleGoalClick={props.handleGoalClick}/>} />
        </div>
    )        
}