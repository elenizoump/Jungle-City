import React, { FunctionComponent } from 'react'

interface CurrentUserProps {
  displayName: string
  photoURL: string
  email: string
}

const CurrentUser: FunctionComponent<CurrentUserProps> = ({
  displayName,
  photoURL,
  email,
  // children,
}) => {
  return (
    <section className="CurrentUser">
      <div className="CurrentUser--profile">
        {photoURL && <img src={photoURL} alt={displayName} />}
        <div className="CurrentUser--information">
          <h2>{displayName}</h2>
          <p className="email">{email}</p>
        </div>
      </div>
      <div>
        {/* <div>{children}</div> */}
        <button>Sign Out</button>
      </div>
    </section>
  )
}

// CurrentUser.defaultProps = {
//   displayName: 'Bill Murray',
//   email: 'billmurray@mailinator.com',
//   photoURL: 'https://www.fillmurray.com/300/300',
// }

export default CurrentUser
