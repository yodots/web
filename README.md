# Your Online Drawer of Ticket Stubs (Client)

on login button click
  encrypt entire post body (a helper function to encrypt everything sent with post/put)
  send encrypted data to /login over post
  if the token was successful
    save it on the client side (local storage)
      window.localStorage.setItem(token, token returned) (getItem returns the token)
    forward to movies.html
  else
    show username/password error