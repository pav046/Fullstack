import React, { Component, createRef } from 'react'
import { AgGridReact } from "ag-grid-react"
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { ClientSideRowModelModule } from 'ag-grid-community'
import ModalBook from './modal_book'
import { FaTrashAlt, FaPlus, FaPen, FaCheck } from "react-icons/fa"

export class AgGridBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rowData: [],
      colDefs: [
        { field: 'id' }, 
        { field: 'title' }, 
        { field: 'author_id' }, 
        { field: 'published_date', valueFormatter: params => params.value.split('T')[0] }, 
        { field: 'price' }, 
        { field: 'stock' },
        { field: 'selected', width: 50, cellRenderer: params => 
          this.state.selectedRow && this.state.selectedRow.id === params.data.id ? <FaCheck /> : ''
      }
      ],
      selectedRow: null,
      showModal: false,
      errorMessage: null
    }

    this.gridRef = createRef()
  }

  componentDidMount() {
    this.fetchBooks();
    document.addEventListener("click", this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside)
  }

  fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/book')
      const data = await response.json()
      this.setState({ rowData: data })
    } catch (error) {
      console.error("Ошибка загрузки книг:", error)
    }
  }

  handleClickOutside = (event) => {
    if (this.gridRef.current && !this.gridRef.current.contains(event.target)) {
      this.setState({ selectedRow: null })
    }
  }

  defaultColDef() {
    return {
      flex: 1,
      minWidth: 100,
      resizable: true
    }
  }


  onRowClicked = (event) => {
    this.setState({ selectedRow: event.data })
  }


  toggleModal = () => {
    if (this.state.selectedRow) {
      this.setState({ showModal: !this.state.showModal })
    }
  }

  handleChange = (e) => {
    console.log(`${e.target.name} ${e.target.value}`)
    const { name, value } = e.target
    this.setState(prevState => ({
      selectedRow: { ...prevState.selectedRow, [name]: value }
    }))
  }

  saveChanges = async (changedRow) => {
    const selectedRow = changedRow
    const rowData = this.state.rowData

    try {
      const response = await fetch(`http://localhost:8080/api/book`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedRow)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Ошибка ${response.status}: ${errorData.message || "Неизвестная ошибка"}`)
      }

      const res = await response.json()

      const updatedData = rowData.map(row =>
        row.id === res.id ? res : row
      )
  
      this.setState({
        rowData: updatedData,
        showModal: false,
        selectedRow: null,
        errorMessage: null
      })  
    } catch (error) {
      console.error("Ошибка сохранения:", error)
      this.setState({ errorMessage: error.message })
    }
  }

  deleteFunction = async (row) => {
    const selectedRow = this.state.selectedRow
    const rowData = this.state.rowData

    try {
      const response = await fetch(`http://localhost:8080/api/book/${selectedRow.id}/`, { method: "DELETE" })
      const res = await response.json()
      const updatedData = rowData.filter(row => row.id !== res.id)

      this.setState({
        rowData: updatedData,
        selectedRow: null
      })
    } catch (error) {
      console.error("Ошибка удаления:", error)
    }
  };

  addFunction = async () => {
    const newBook = {
      title: "----",
      published_date: "2000-01-01",
      price: 0,
      stock: 1
    }

    try {
      const response = await fetch('http://localhost:8080/api/book', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook)
      })

      const createdBook = await response.json()

      this.setState(prevState => ({
        rowData: [...prevState.rowData, createdBook],
        selectedRow: createdBook,
        showModal: true
      }))

    } catch (error) {
      console.error("Ошибка добавления книги:", error)
    }
  }

  cancel = () => {
    this.setState({ showModal: false, selectedRow: null, errorMessage: null })
  }

  



  render() {
    return (
      <div ref={this.gridRef} className='ag-theme-quartz-dark' style={{ height: 400, width: 1200, margin: "140px auto 30px auto" }}>
        <div className='books-table-header' style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <h2>Список Книг</h2>
          <div className='buttons'>
            <FaPlus className='add-button' onClick={this.addFunction} />
            <FaPen 
              onClick={this.state.selectedRow ? this.toggleModal : null} 
              className={this.state.selectedRow ? 'change-button' : 'change-button-not-active'} 
              style={{ cursor: this.state.selectedRow ? "pointer" : "default" }}
            />
            <FaTrashAlt 
              className={this.state.selectedRow ? 'delete-button' : 'delete-button-not-active'} 
              onClick={this.state.selectedRow ? this.deleteFunction : null}
            />
          </div>
        </div>
        <AgGridReact 
          rowData={this.state.rowData} 
          columnDefs={this.state.colDefs} 
          modules={[ClientSideRowModelModule]}
          onRowClicked={this.onRowClicked} 
          defaultColDef={this.defaultColDef()} 
        />

        {this.state.showModal && (
          <ModalBook 
            selectedRow={this.state.selectedRow}
            handleChange={this.handleChange}
            saveChanges={this.saveChanges}
            cancel={this.cancel}
            errorMessage={this.state.errorMessage}
          />
        )}
      </div>
    )
  }
}

export default AgGridBooks
