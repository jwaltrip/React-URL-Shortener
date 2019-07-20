import React from "react"
import cx from "classnames"
import s from "./FormInput.module.css"

class FormInput extends React.Component {
  state = {
    longUrl: ""
  }
  
  handleTextChange = (e) => {
    e.preventDefault()
    
    this.setState({
      longUrl: e.target.value
    })
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <form className="w-100" onSubmit={this.handleSubmit}>
          <div className={cx('form-group', 'w-100', s.form)}>
            <input
              type="text"
              name="longUrl"
              className={cx('form-control', 'form-control-lg', 'mr-1', s.text_input)}
              placeholder="Enter long URL here..."
              value={this.state.longUrl}
              onChange={this.handleTextChange}
            />
            <button onSubmit={this.handleSubmit} className={cx('btn', 'btn-lg', 'btn-success', 'ml-1', s.btn_input)}>
              Generate Short URL
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default FormInput
