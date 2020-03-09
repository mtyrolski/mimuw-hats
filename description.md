MIMUW Hats
=====

User features
-----
  * web frontend and mobile app
  * user authentication - limited to mimuw students, as simple as possible
    for the user
  * ability to register and report lost/found items: hats (main) and non-hats
    (two categories)

  * registering items: user uploads photo(s) of item along with short text
    description; data is validated by server, user receives error if data
    is not valid, can ask for manual validation
  * reporting found item: user uploads photo(s) of found item and metadata
    such as text description of item and rough location
  * reporting lost item: user uploads text metadata with optional photo(s) or
    chooses already-registered item to be marked as lost
  * marking item as found

  * notifying users of items being found: push notifications, email, check
    manually in app/website
  * possible extension: connection with external message bots
  * when matching lost items, prioritize items marked as lost, then all
    registered items, finally post globally - simple posts consisting of photo
    and text with ability to mark as found and simple interaction - bumping,
    reactions, no comments
    
  * global newsfeed, lists of items that are currently found/lost,
    sorting/filtering by category, time etc.

  * rewards for finding lost items (different cases: user reporting lost item
    gives reward to the person who found it, some reward for any valid cases of
    reporting found items, initial reward for registering any hat
  * public ranklist based on reward amount (XP/cash) and fancy MIMUW names
    for each level (1 - WPI, 2 - MD etc.) 
   
  * events integration (from external sources like webcams) - adding lost items
    from cameras 

Backend features
-----
  * classifier for validating type of object
  * model for matching submitted found items with lost/registered items
  * model for predicting areas with most often lost items
