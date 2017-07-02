import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../actions';

class SignUp extends Component {
    renderField(field){
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return(
            <div className = { className }>
                <label>{ field.label }</label>
                <input
                    className="form-control"
                    type={ field.type }
                    { ...field.input } />
                <div className="text-help">
                    { touched ? error : '' }
                </div>
            </div>
        );
    }

    onsubmit(values){

    }

    render(){
        const { handeuSubmit } = this.props;

        return (
            <div className="signupContainer">
                <h2>Log up to gain access to JusBuss Dashboard</h2>
                <p>Use dashboard to create, delete and update products/service information.</p>

                <form onSubmit = { handleSubmit(this.onSubmit.bind(this)) }>
                    <Field
                        label="First Name:"
                        name="first_name"
                        type="text"
                        component={ this.renderField } />

                    <Field
                        label="Last Name:"
                        name="last_name"
                        type="text"
                        component={ this.renderField } />

                    <Field
                        label="Username:"
                        name="user"
                        type="text"
                        component={ this.renderField } />

                    <Field
                        label="Email:"
                        name="email"
                        type="email"
                        component={ this.renderField } />

                    <Field
                        label="Phone:"
                        name="tel"
                        type="phone"
                        component={ this.renderField } />

                    <button type="submit" className="btn btn-primary">Sign Up</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </form>
            </div>
        );
    }
}

function validate(values){
    const errors = {};

    if(!values.first_name || values.first_name.length < 3){
        errors.first_name = "Please enter a valid first name.";
    }

    if(!values.last_name || values.last_name.length < 3){
        errors.last_name = "Please enter a valid last name.";
    }

    if(!values.username || values.username.length < 3){
        errors.username = "Enter a valid username that is atleast 3 characters.";
    }

    if(!values.email || values.email.length < 10){
        error.email = "Enter a valid email address.";
    }

    if(!values.tel || values.tel.length < 7){
        error.tel = "Enter a valid phone #";
    }
}

function mapStateToProps(state){
    return { signupStatus: state.signupStatus }
}

export default reduxForm({
    form: 'SignUpForm',
    validate
})(
    connect(mapStateToProps, { signup }) (SignUp)
);