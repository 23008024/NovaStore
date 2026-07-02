const prisma = require("../prisma/prisma");


// GET USER CART
const getCart = async (req, res) => {
  try {

    const userId = req.user.id;


    let cart = await prisma.cart.findUnique({

      where: {
        userId
      },

      include: {

        items: {

          include: {
            product: true
          }

        }

      }

    });


    if (!cart) {

      cart = await prisma.cart.create({

        data: {
          userId
        },

        include: {
          items: {
            include: {
              product: true
            }
          }
        }

      });

    }


    res.json({

      success: true,
      data: cart

    });


  } catch (error) {

    res.status(500).json({

      success:false,
      message:error.message

    });

  }
};



// ADD PRODUCT TO CART
const addToCart = async (req,res)=>{

try{


const userId=req.user.id;

const {productId, quantity}=req.body;



let cart=await prisma.cart.findUnique({

where:{
userId
}

});



if(!cart){

cart=await prisma.cart.create({

data:{
userId
}

});

}




const existingItem=await prisma.cartItem.findUnique({

where:{

cartId_productId:{
cartId:cart.id,
productId
}

}

});



if(existingItem){


const updated=await prisma.cartItem.update({

where:{
id:existingItem.id
},

data:{
quantity:
existingItem.quantity + quantity
}

});


return res.json({

success:true,
data:updated

});


}




const item=await prisma.cartItem.create({

data:{

cartId:cart.id,

productId,

quantity

}

});



res.json({

success:true,
data:item

});



}catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};




// REMOVE ITEM
const removeFromCart = async(req,res)=>{

try{


const {id}=req.params;


await prisma.cartItem.delete({

where:{
id
}

});


res.json({

success:true,
message:"Removed"

});


}catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};



module.exports={

getCart,
addToCart,
removeFromCart

};