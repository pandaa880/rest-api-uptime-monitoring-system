# rest-api-uptime-monitoring-system

An **Uptime Monitor** allows users to enter **URLs** they want monitored, and receive alerts when those resources "go down" or "come back up".

### Requirements

1. The API listens on a PORT and accepts incoming HTTP requests for **POST, GET, PUT, DELETE and HEAD**.
1. The API allows a client to connect, then create a new user, then edit and delete that user.
1. The API allows a user to "Sign In" which gives them a token that they can use for subsequent authenticated requests.
1. The API allows the user to "Sign Out" which invalidates their token.
1. The API allows a signed-in user to use their token to create a new "check".
1. The API allows a signed-in user to edit or delete any of their checks and the check limit is 5.
1. In the background, workers perform all the "checks" at the appropriate times, and send alerts to the users when a check changes its state from **UP** to **Down** or visa versa.
