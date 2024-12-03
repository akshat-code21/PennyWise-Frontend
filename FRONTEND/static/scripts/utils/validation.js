const z = window.Zod;

// Validation schemas
export const userSignupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(14, "Password must not exceed 14 characters")
        .regex(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            "Password must contain 1 uppercase, 1 lowercase, 1 number and 1 special character"
        )
});

export const userSigninSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(14, "Password must not exceed 14 characters")
});

export const expenseSchema = z.object({
    description: z.string().min(1, "Description is required"),
    category: z.string().min(1, "Category is required"),
    amount: z.number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number"
    }).positive("Amount must be positive")
});

// Validation functions
export const validateSignup = (data) => {
    try {
        userSignupSchema.parse(data);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            errors: error.errors.map(err => ({
                field: err.path[0],
                message: err.message
            }))
        };
    }
};

export const validateSignin = (data) => {
    try {
        userSigninSchema.parse(data);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            errors: error.errors.map(err => ({
                field: err.path[0],
                message: err.message
            }))
        };
    }
};

export const validateExpense = (data) => {
    try {
        expenseSchema.parse(data);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            errors: error.errors.map(err => ({
                field: err.path[0],
                message: err.message
            }))
        };
    }
}; 