const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing : false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title : title ,
    price : price ,
    description : description ,
    imageUrl : imageUrl
  })
  .then((result) => {
    console.log('created product');
    res.redirect('/admin/products'); // to redirect after adding products
  })
  .catch(err => console.log(err));
};

exports.getEditProduct = (req,res,next) => {
  const editMode = req.query.edit ; // 'edit' is key to check whether it present in query or not.
  if(!editMode){
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)  // latest version uses the 'findByPk' in place of 'findById'
  .then(product => {
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product',{
      pageTitle : 'Edit Product',
      path : '/admin/edit-product',
      product : product,
      editing : editMode
  })
  })
  .catch(err => console.log(err));
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
  .then(product => {
    product.title = updatedTitle;
    product.imageUrl = updatedImageUrl;
    product.price = updatedPrice;
    product.description = updatedDesc;
    return product.save();   // it returns a promise which we can call after it was successfull
  })
  .then(result => {
    console.log('updated product!');
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => console.log(err)); 
};

exports.postDeleteProduct = (req,res,next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
  .then((product) => {
    return product.destroy();
  })
  .then(result =>{
    console.log('Destroyed product');
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
}


