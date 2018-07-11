import React from 'react'

const GithubUser = props => {
  const languages = {}

  props.repositoriesContributedTo.edges.forEach(({ node }) => {
    const primaryLanguage =
      node && node.primaryLanguage && node.primaryLanguage.name
    if (!primaryLanguage) {
      return
    }
    if (!languages[primaryLanguage]) {
      languages[primaryLanguage] = 0
    }
    ++languages[primaryLanguage]
  })

  const l2 = []
  let r
  for (r in languages) {
    l2.push([r, languages[r]])
  }

  // sort by number of appearances
  const l3 = l2
    .sort((a, b) => {
      if (a[1] > b[1]) {
        return 1
      }
      if (a[1] < b[1]) {
        return -1
      }
      return 0
    })
    .reverse()
    // convert to a string
    .map(x => `${x[0]} (${x[1]})`)
    .join(', ')

  return (
    <div style={{ padding: '1em', margin: '1em', border: 'thin solid blue' }}>
      <h2>{props.name || props.login}</h2>
      {props.bio && <p>{props.bio}</p>}
      <dl>
        <dt>Location</dt>
        <dd>{props.location}</dd>
        <dt>Site web</dt>
        <dd>{props.websiteUrl}</dd>
        <dt>Créé</dt>
        <dd>{props.createdAt}</dd>

        <dt>Étoiles</dt>
        <dd>
          {props.starredRepositories && props.starredRepositories.edges.length}{' '}
          dépots
        </dd>

        <dt>Contribué à</dt>
        <dd>
          {props.repositoriesContributedTo &&
            props.repositoriesContributedTo.edges.length}{' '}
          dépots
        </dd>

        <dt>Languages</dt>
        <dd>{l3}</dd>
      </dl>
      {props.isHireable && <p>Disponible pour travailler</p>}
    </div>
  )
}

export default GithubUser
