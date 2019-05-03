import React, { Component } from 'react'
import "./home.css"


export default class HomeList  extends Component {
    render() {
        return (
            <div className="form-group">
            <h1>Welcome to my page today</h1>
            <label htmlFor="description">Extracting text from a Web page can be done in several ways.
             The method you choose should depend on the purpose you have in mind for the text. 
             If all your business needs is to print out the text for use as instructions or 
             guidelines, you can extract the text as HTML only. If there are images and text on 
             the Web page and you want to keep the page it in its original form, you should extract 
             the full Web page. There are three ways to extract the text, and there are two ways to extract
              the text and images together.
              </label>
          </div>
        );
    }
}