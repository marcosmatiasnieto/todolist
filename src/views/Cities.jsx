import React from 'react';
import axios from 'axios';

export class Cities extends React.Component {
  constructor() {
    super();
    this.state = {
      ciudad: "",
      ciudades: [],
      pais: "",
      paises: [],
    };
  }
  componentDidMount() {
    axios.get("https://api-fake-pilar-tecno.herokuapp.com/countries")
      .then(response => this.setState({ paises: response.data }))
    axios.get("https://api-fake-pilar-tecno.herokuapp.com/places?_expand=countrie")
      .then(response => this.setState({ ciudades: response.data }))

  }
  handleImputCiudad = (e) => {
    this.setState({
      ciudad: e.target.value
    })
  }
  handleSelectPais = (e) => {
    this.setState({
      pais: JSON.parse(e.target.value)

    });
  }
  eleminarCiudad =(id) =>{
    axios.delete(`https://api-fake-pilar-tecno.herokuapp.com/places/${id}`)
    .then(()=> {
      var ciudadNuevo=this.state.ciudades.filter(ciudad=>ciudad.id !== id)
      this.setState({ciudades:ciudadNuevo})
    })
  }
  guardarCiudad = (e) => {
    e.preventDefault();
    axios.post(
      "https://api-fake-pilar-tecno.herokuapp.com/places",
      {
        name: this.state.ciudad,
        countrieId: this.state.pais
      }
    ).then(response => {
      this.setState({ ciudades: [...this.state.ciudades, response.data] })
    }) 
  }
    


  render() {
    return (
      <form onSubmit={this.guardarCiudad}>
        <label> Seleccione pais:  </label><br></br>
        <select name="pais" id="selectPais" onChange={(e) => this.handleSelectPais(e)}>
          <option value={JSON.stringify({})}>Elija Pais</option>
          {this.state.paises.map((pais) => (
            <option key={pais.id} value={pais.id}>
              {pais.name}
            </option>

          ))}
        </select> <br></br>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Ciudad</th>
              <th scope="col">Pais</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.ciudades.length > 0 && this.state.ciudades.map(ciudad => (
              <tr>
                <th scope="row">{ciudad.id}</th>
                <td>{ciudad.name}</td>
                <td>{this.state.paises.find(pais => pais.id === ciudad.countrieId).name}</td>
                <td> <button type="button" className="btn btn-danger"onClick={()=>this.eleminarCiudad(ciudad.id)} >Borrar</button> </td>
              </tr>
            ))}

          </tbody>

        </table>

        <div className="form-group">

          <label htmlFor="ciudad">Ciudad</label>
          <input type="text" className="form-control" id="idCiudad" placeholder="Ingresar Ciudad" onChange={this.handleImputCiudad} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>

      </form>);
  }

}
