const authMiddleware = (req, res, next) => {
    // Check if we're on a protected route
    const protectedRoutes = ['/dashboard', '/detailExpense'];
    
    if (protectedRoutes.includes(req.path)) {
        // Get token from cookies or query params
        const token = req.cookies?.token || req.query?.token;
        
        if (!token) {
            return res.redirect('/404');
        }
        
        // You could also verify token here if needed
        try {
            // Optional: Verify token validity
            // jwt.verify(token, 'your-secret-key');
            next();
        } catch (error) {
            return res.redirect('/404');
        }
    } else {
        next();
    }
};

module.exports = authMiddleware; 