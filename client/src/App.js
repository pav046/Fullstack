import React from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import AgGridBooks from "./components/AgGridBooks"
import AgGridAuthors from "./components/AgGridAuthors"
import Dashboard from "./components/Dashboard"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { activeTab: "Таблицы" }
  }

  changeTab = (tab) => {
    this.setState({ activeTab: tab })
  }

  render() {
    return (
      <div>
        <Header />
        <div className="main-content">
          <Dashboard activeTab={this.state.activeTab} changeTab={this.changeTab} />
          {this.state.activeTab === "Таблицы" && (
            <div className="wrapper">
              <AgGridAuthors />
              <AgGridBooks />
            </div>
          )}
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
