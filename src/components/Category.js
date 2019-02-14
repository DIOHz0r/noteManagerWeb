import React from 'react'

export default class extends React.Component {
  state = {
    data: {
      recent_notes: []
    }
  }

  async componentDidMount() {
    const {match} = this.props
    const resp = await butter.category.retrieve(match.params.category, {
      include: 'recent_notes'
    })
    this.setState(resp.data)
  }

  render() {
    const category = this.state.data

    return (
        <div>
          <h1>{category.name}</h1>
          <div>
            {this.state.data.recent_notes.map((post, key) => {
              return (
                  <div key={key}>
                    <a href={`/notes/${post.slug}`}>{post.title}</a>
                  </div>
              )
            })}
          </div>
        </div>
    )
  }
}
