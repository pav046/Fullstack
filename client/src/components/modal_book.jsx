import React, { Component } from 'react'

export class ModalBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRow: props.selectedRow || {}
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState((prevState) => ({
      selectedRow: {
        ...prevState.selectedRow,
        [name]: value
      }
    }))
  }

  saveChanges = (event) => {
    event.preventDefault()
    this.props.saveChanges(this.state.selectedRow)
  }

  cancel = (event) => {
    event.preventDefault()
    this.props.cancel()
  }

  render() {
    const { selectedRow } = this.state

    if (!selectedRow) {
      return null
    }

    return (
      <form>
        <div className="books-modal-overlay">
          <div className="books-modal-content">
            <h3>Редактирование книги</h3>
            <label>Название:</label>
            <input
              type="text"
              name="title"
              value={selectedRow.title || ''}
              onChange={this.handleChange}
              className='books-modal-input'
            />

            <label>Автор ID:</label>
            <input
              type="number"
              name="author_id"
              value={selectedRow.author_id || ''}
              onChange={this.handleChange}
              className='books-modal-input'
            />

            <label>Дата публикации:</label>
            <input
              type="date"
              name="published_date"
              value={selectedRow.published_date.split("T")[0] || ''}
              onChange={this.handleChange}
              className='books-modal-input'
            />

            <label>Цена:</label>
            <input
              type="number"
              name="price"
              value={selectedRow.price || ''}
              onChange={this.handleChange}
              className='books-modal-input'
            />

            <label>Количество:</label>
            <input
              type="number"
              name="stock"
              value={selectedRow.stock || ''}
              onChange={this.handleChange}
              className='books-modal-input'
            />

            <div className="books-modal-buttons">
              <button onClick={this.saveChanges} className='books-modal-button'>Сохранить</button>
              <button onClick={this.cancel} className='books-modal-button'>Отмена</button>
            </div>
            {this.props.errorMessage && (
                <div className="error-message">
                  {this.props.errorMessage}
                </div>
            )}
          </div>
        </div>
      </form>
    )
  }
}

export default ModalBook
