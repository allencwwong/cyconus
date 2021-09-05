# Cyconus CMS

|   Name    |                 API                                                     | Description                              |  Verb     |
|-----------|-------------------------------------------------------------------------|------------------------------------------|-----------|
|Create     |https://www.cyconus.com/products/api/new/?category={category}            |  insert new product item to db           | GET       |
|Update     |https://www.cyconus.com/products/api/update/?category={category}&id={id} | update exisiting product                 | POST      |
|Read       |https://www.cyconus.com/products/api/product/?category={category}&id={id}| retreive item info by id                 | GET       |
|Read       |https://www.cyconus.com/products/api/productlist/?category={category}    | retreive partial info for category items | GET       |
|Delete     |https://www.cyconus.com/products/api/remove/?category={category}&id={id} | remove specific item by id               | DELETE.   |
