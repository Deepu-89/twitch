import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderinput(formprops) {
    console.log(formprops.meta);
    const { error } = formprops.meta;
    return (
      <div className="field">
        <label>{formprops.label}</label>
        <input {...formprops.input} />
        <h3>{error}</h3>
      </div>
    );
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form"
      >
        <Field name="title" component={this.renderinput} label="ENTER TITLE" />
        <Field
          name="description"
          component={this.renderinput}
          label="ENTER DESCIPTION"
        />
        <button className="ui button primary" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

const validate = (formvalues) => {
  const errors = {};

  if (!formvalues.title) {
    errors.title = "you munst enter title";
  }

  if (!formvalues.description) {
    errors.description = "you must enter description";
  }

  return errors;
};
export default reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);
