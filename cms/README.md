# Cyconus CMS

|   Name    |                 API                                               | Description                              |  Verb     |
|-----------|-------------------------------------------------------------------|------------------------------------------|-----------|
|Create     |https://www.cyconus.com/products/api/new/{category}                |  insert new product item to db           | GET       |
|Update     |https://www.cyconus.com/products/api/update/{category}/?id={id}    | update exisiting product                 | POST      |
|Read       |https://www.cyconus.com/products/api/product/{category}/?id={id}   | retreive item info by id                 | GET       |
|Read       |https://www.cyconus.com/products/api/productlist/{category}.       | retreive partial info for category items | GET       |
|Delete     |https://www.cyconus.com/products/api/remove/{category}/?id={id}    | remove specific item by id               | DELETE.   |
