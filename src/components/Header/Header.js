import React, {Component} from "react";
import "./css/Header.css"

export default class Header extends Component{
    render(){
        return(
            <header>
                <nav className="container-fluid">
                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <h2>
                                Todo App
                            </h2>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
                            <button>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                    </div>
                </nav>
            </header>
        );
    };
}