const {

createProduct,

getProducts,

getProductById,

updateProduct,

deleteProduct

}=require("../services/product.service");





const create = async(req,res)=>{


try{


const product = await createProduct(req.body);


res.status(201).json({

success:true,

data:product

});



}catch(error){


res.status(400).json({

success:false,

message:error.message

});


}


};








const getAll = async(req,res)=>{


try{


const result = await getProducts(req.query);



res.json({

success:true,

data: result.products,

pagination: result.pagination

});


}catch(error){


res.status(400).json({

success:false,

message:error.message

});


}


};








const getOne = async(req,res)=>{


try{


const product = await getProductById(

req.params.id

);



res.json({

success:true,

data:product

});


}catch(error){


res.status(404).json({

success:false,

message:error.message

});


}


};









const update = async(req,res)=>{


try{


const product = await updateProduct(

req.params.id,

req.body

);



res.json({

success:true,

data:product

});



}catch(error){


res.status(400).json({

success:false,

message:error.message

});


}


};









const remove = async(req,res)=>{


try{


await deleteProduct(

req.params.id

);



res.json({

success:true,

message:"Product deleted"

});



}catch(error){


res.status(400).json({

success:false,

message:error.message

});


}


};







module.exports={

create,

getAll,

getOne,

update,

remove

};