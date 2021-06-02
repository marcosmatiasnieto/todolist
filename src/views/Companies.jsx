import React from 'react';
import axios from 'axios';

export class Companies extends React.Component {
  constructor() {
    super();
    this.state = {
      ciudad: "",
      ciudades: [],
      compania:"",
      companias: []
    };
  }
  componentDidMount() {
    axios.get("https://api-fake-pilar-tecno.herokuapp.com/places?_expand=countrie")
    .then(response => this.setState({ ciudades: response.data }))
    axios.get("https://api-fake-pilar-tecno.herokuapp.com/organizations?_expand=place")
      .then(response => this.setState({ companias: response.data }))


  }
  handleImputCompania = (e) => {
    this.setState({
      compania: e.target.value
    })
  }
  handleSelectCiudad = (e) => {
    this.setState({
      ciudad: JSON.parse(e.target.value)

    });
  }
  eleminarCompania =(id) =>{
    axios.delete(`https://api-fake-pilar-tecno.herokuapp.com/organizations/${id}`)
    .then(()=> {
      var companiaNuevo=this.state.companias.filter(compania=>compania.id !== id)
      this.setState({companias:companiaNuevo})
    })
  }
  guardarCompania = (e) => {
    e.preventDefault();
    axios.post(
      "https://api-fake-pilar-tecno.herokuapp.com/organizations",
      {
        name: this.state.compania,
        placeId: this.state.ciudad
      }
    ).then(response => {
      this.setState({ companias: [...this.state.companias, response.data] })
    }) 
  }
    
  render() {
    return (
      <form onSubmit={this.guardarCompania}>
        <label> Seleccione ciudad:  </label><br></br>
        <select name="ciudad" id="selectCiudad" onChange={(e) => this.handleSelectCiudad(e)}>
          <option value={JSON.stringify({})}>Elija Ciudad</option>
          {this.state.ciudades.map((ciudad) => (
            <option key={ciudad.id} value={ciudad.id}>
              {ciudad.name}
            </option>

          ))}
        </select> <br></br>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Compania</th>
              <th scope="col">Ciudad</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.companias.length > 0 && this.state.companias.map(compania => (
              <tr key={compania.id}>
                <th scope="row">{compania.id}</th>
                <td>{compania.name}</td>
                <td>{this.state.ciudades.find(ciudad => ciudad.id === compania.placeId).name}</td>
                <td> <button type="button" className="btn btn-danger"onClick={()=>this.eleminarCompania(compania.id)} >Borrar</button> </td>

              </tr>
            ))}

          </tbody>

        </table>

        <div className="form-group">

          <label htmlFor="ciudad">Compania</label>
          <input type="text" className="form-control" id="idCompania" placeholder="Ingresar Compania" onChange={this.handleImputCompania} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>

      </form>);
  }

}
