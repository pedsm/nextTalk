import React, { Fragment } from 'react';
import {fetchPostcodes} from '../service/postcodeService'
import Card from '../components/Card'

const { error } = console


class App extends React.Component {
  static async getInitialProps({ query }) {
    const { postcode } = query
    if(postcode != null) {
      return {
        input: postcode,
        postcodes: await fetchPostcodes(postcode)
      }
    }
    return {
      input: '',
      postcodes: []
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      input: props.input,
      postcodes: props.postcodes 
    }
  }

  handleChange = (e) => {
    const input = e.target.value
    fetchPostcodes(input)
      .then((postcodes) => {
        this.setState(() => ({ 
          input,
          postcodes 
        }))
      })
      .catch((err) => error(err))
  }

  render() {
    const { state } = this

    return (
      <Fragment>
        <section className="hero is-info">
          <div className="hero-body">
            <div className="container">
              <h1 className="title"><span aria-label="build" role="img">🔎</span> Postcode Lookup</h1>
              <form>
                <input onChange={this.handleChange.bind(this)} className="input" placeholder="Postcode" type="text" name="postcode" autoComplete="off"/>
              </form>
            </div>
          </div>
        </section>
        <main className="container">
          <div className="container">
            {state.postcodes.length == 0 ? (
              <div className="card">
                <div className="card-content">
                  {state.input == ''
                  ? <p className="title">Enter a postcode</p>
                  : <p className="title">No postcodes found for: '{state.input}'</p>
                  }
                  <p className="subtitle">Try a writing an UK postcode</p>
                </div>
              </div>
            ) : null}
            {state.postcodes.map((postcode, i) => (
              <Card key={postcode.postcode} postcode={postcode} />
            ))}
          </div>
        </main>
      </Fragment>
    );
  }
}

export default App;
