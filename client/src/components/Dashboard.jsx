import React, { Component } from "react"

export class Dashboard extends Component {
  render() {
    const { activeTab, changeTab } = this.props

    return (
      <div className="dashboard-container">
        <ul className="dashboard-list">
          <li 
            className={activeTab === "Таблицы" ? "active" : ""}
            onClick={() => changeTab("Таблицы")}
          >
            Таблицы
          </li>
          <li 
            className={activeTab === "О нас" ? "active" : ""}
            onClick={() => changeTab("О нас")}
          >
            О нас
          </li>
          <li 
            className={activeTab === "Прочее" ? "active" : ""}
            onClick={() => changeTab("Прочее")}
          >
            Прочее
          </li>
        </ul>
      </div>
    )
  }
}

export default Dashboard
