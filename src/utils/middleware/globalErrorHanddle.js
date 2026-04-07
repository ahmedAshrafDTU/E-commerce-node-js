const globalErrorHanddle = ((err,req,res,next)=>{
  res.status(400).json(err);
})
export default globalErrorHanddle;
