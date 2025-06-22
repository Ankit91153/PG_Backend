export const validate = (schema) => (req, res, next) => {
    try {
      req.body = schema.parse(req.body); 
      next();
    } catch (err) {
        if (err.errors && err.errors.length > 0) {
            return res.status(400).json({
              success: false,
              message: err.errors[0].message, // ✅ get actual message
            });
          }
      
          return res.status(400).json({
            success: false,
            message: 'Validation error',
          });
    }
  };