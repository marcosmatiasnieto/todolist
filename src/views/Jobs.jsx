import React from 'react';
import axios from 'axios';

export class Jobs extends React.Component {
  constructor() {
    super();
    this.state = {
      compania:"",
      companias: [],
      empleo:"",
      empleos:[],
      empleoDescripcion:""
    };
  }
  componentDidMount() {
    axios.get("https://api-fake-pilar-tecno.herokuapp.com/jobs?_expand=organization")
    .then(response => this.setState({ empleos: response.data }))
    axios.get("https://api-fake-pilar-tecno.herokuapp.com/organizations?_expand=place")
      .then(response => this.setState({ companias: response.data }))
  }
  handleImputEmpleo = (e) => {
    this.setState({
      empleo: e.target.value
    })
  }
  handleSelectCompania = (e) => {
    this.setState({
      compania: JSON.parse(e.target.value)

    });
  }
  handleTextAreaDescripcionEmpleo = (e) => {
    this.setState({
      empleoDescripcion: e.target.value
    })}
    eleminarEmpleo =(id) =>{
        axios.delete(`https://api-fake-pilar-tecno.herokuapp.com/jobs/${id}`)
        .then(()=> {
          var empleoNuevo=this.state.empleos.filter(empleo=>empleo.id !== id)
          this.setState({empleos:empleoNuevo})
        })
      }
  guardarEmpleo = (e) => {
    e.preventDefault();
    axios.post(
      "https://api-fake-pilar-tecno.herokuapp.com/jobs",
      {
        position: this.state.empleo ,
        description: this.state.empleoDescripcion,
        organizationId: this.state.compania
      }
    ).then(response => {
      this.setState({ empleos: [...this.state.empleos, response.data] })
    }) 
  }
    
  render() {
    return (
      <form onSubmit={this.guardarEmpleo}>
        <label> Seleccione Compania:  </label><br></br>
        <select name="compania" id="selectCompania" onChange={(e) => this.handleSelectCompania(e)}>
          <option value={JSON.stringify({})}>Elija Compania</option>
          {this.state.companias.map((compania) => (
            <option key={compania.id} value={compania.id}>
              {compania.name}
            </option>

          ))}
        </select> <br></br>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Empleo</th>
              <th scope="col">Compania</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.empleos.length > 0 && this.state.empleos.map(empleo => (
              <tr key={empleo.id}>
                <th scope="row">{empleo.id}</th>
                <td>{empleo.position} - {empleo.description} </td>
                <td>{this.state.companias.find(compania => compania.id === empleo.organizationId).name}</td>
                <td> <button type="button" className="btn btn-danger"onClick={()=>this.eleminarEmpleo(empleo.id)} >Borrar</button> </td>

              </tr>
            ))}

          </tbody>

        </table>

        <div className="form-group">

          <label htmlFor="ciudad">Empleo</label>
          <input type="text" className="form-control" id="idEmpleo" placeholder="Ingresar Empleo" onChange={this.handleImputEmpleo} />
          <label>Descripcion</label>
          <textarea name="descripcion" id="descripcionId" cols="30" rows="10" onChange={this.handleTextAreaDescripcionEmpleo}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>);
  }

}
