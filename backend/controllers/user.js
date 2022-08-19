

export const getMe = async(req,res,next) => {
    try {
        let user = req.user;
         res.status(200).json({
             status:"SUCCESS",
             user
         })
    } catch (error) {
        res.status(500).json({
            status:"Failed",
            error:error.message
        })
    }
}
export const updateMe = async(req,res,next) => {
    try {
        const updates = Object.keys(req.body);
        // DEFINED ALLOWED UPDATES
        const allowedUpdates = ['firstName', 'lastName' ,'username']
        // FILTER UPDATES
        const validOperations = updates.filter((update)=>allowedUpdates.includes(update))
        // IF NO VALID UPDATES THROW ERROR
        console.log(validOperations);
        if(validOperations.length ==0)
        {
            throw new Error("SORRY WE CAN'T DO UPDATES RIGHTNOW!")
        }
        // FOR EACH VALID UPDATE  DO THE UPDATE
        validOperations.forEach(update => req.user[update] = req.body[update])
        // SAVE THE USER
        await req.user.save();
        const id = req.user._id
        const updatedUser = await User.findById(id);

        // RETURN RESPONSE
        res.status(200).json({
            status:"Success",
            message:"User updated successfully",
            user: updatedUser
        })

    } catch (error) {
        res.status(400).json({
            status:"error",
            message: error.message
        });
    }
}
export const deleteMe = async(req,res,next) => {
    try {
         // const user = await User.findByIdAndDelete(req.user._id)
         await req.user.remove();
         res.status(200).json({
             status:"Success",
             message:"User deleted successfully",
         })
    } catch (error) {
        res.status(400).json({
            status:"error",
            message: error.message
        });  
    }
}

