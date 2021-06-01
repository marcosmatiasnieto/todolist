import { bottom } from '@popperjs/core';
import axios from 'axios';
import React from 'react';

export class Countries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pais: "",
      paises: []

    };
  }
  componentDidMount(){
    axios.get("https://api-fake-pilar-tecno.herokuapp.com/countries")
      .then(response => this.setState({paises: response.data}))
  }
  handleImput = (e) => {
    this.setState({
      pais: e.target.value
    })
  }
  guardarPais = (e) => {
    e.preventDefault();
    axios.post(
      "https://api-fake-pilar-tecno.herokuapp.com/countries",
      {
        name: this.state.pais
      }
    ).then(response => this.setState({paises:[...this.state.paises,response.data]}))
  }
  eleminarPais =(id) =>{
    axios.delete(`https://api-fake-pilar-tecno.herokuapp.com/countries/${id}`)
    .then(()=> {
      var paisesNuevo=this.state.paises.filter(pais=>pais.id !== id)
      this.setState({paises:paisesNuevo})
    })
  }

  render() {
    return (
      <form onSubmit={this.guardarPais}>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Pais</th>
              <th scope="col">Acciones</th>

            </tr>
          </thead>
          <tbody>
            {this.state.paises.length > 0 && this.state.paises.map(pais => (
              <tr>
                <th scope="row">{pais.id}</th>
                <td>{pais.name}</td>
                <td> <button type="button" class="btn btn-danger"onClick={()=>this.eleminarPais(pais.id)} >Borrar</button> </td>
              </tr>
            ))}
          </tbody>

        </table>

        <div class="form-group">
          <label for="pais">Pais</label>
          <input type="text" class="form-control" id="idPais" placeholder="Ingresar pais" onChange={this.handleImput} />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        
      </form>
    );
  }
}
