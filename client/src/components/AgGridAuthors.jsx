import React, { useRef, useMemo, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { InfiniteRowModelModule } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-theme-quartz.css'


const AgGridAuthors = () => {
  const gridRef = useRef()
  const limit = 10

  const colDefs = useMemo(() => [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Имя'},
    { field: 'birthdate', headerName: 'Дата рождения', valueFormatter: params => params.value?.split('T')[0] ?? "" }, 
    { field: 'country', headerName: 'Страна' }
  ], [])

  const createDataSource = useCallback(() => ({
    getRows: async (params) => {
      const { startRow } = params
      const offset = startRow

      try {
        const response = await fetch(`http://localhost:8080/api/author?limit=${limit}&offset=${offset}`)
        const data = await response.json()

        const lastRow = data.length < limit ? offset + data.length : null
        params.successCallback(data, lastRow)
      } catch (error) {
        console.error("Ошибка загрузки авторов:", error)
        params.failCallback()
      }
    }
  }), [])



  const onGridReady = useCallback((params) => {
    gridRef.current = params.api
    params.api.setGridOption('datasource', createDataSource())
  }, [createDataSource])

  return (
    <div className="ag-theme-quartz-dark" style={{ height: 400, width: 820, margin: "40px auto" }}>
      <h2 style={{ marginBottom: "10px" }}>Список авторов</h2>
      <AgGridReact
        columnDefs={colDefs}
        rowModelType="infinite"
        cacheBlockSize={limit}
        onGridReady={onGridReady}
        modules={[InfiniteRowModelModule]}
      />
    </div>
  )
}

export default AgGridAuthors
