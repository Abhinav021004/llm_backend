import * as z from 'zod';

export const signupschema = z.object({
    name:
    z.string()
    .trim()
    .min(3, 'min length should be 3')
    .max(30, 'max length should be 30'),

    age:
    z.number()
    .min(10, 'min age should be 10')
    .max(100, 'max age should be 100')
    .optional(),

    email:
    z.preprocess(
        (value) => typeof value == 'string' ? value.trim().toLowerCase() : value,
        z.email()
    ),

    password:
    z.string()
    .min(8)
    .max(30)
    .regex(/[A-Z]/, 'there must be capital letter')
    .regex(/[a-z]/, 'there must be a lowercase too')
    .regex(/[$#@%!(){}*]/, 'there must be a special character')
});

export const loginschema = z.object({
    email:
    z.preprocess(
        (value) => typeof value == 'string' ? value.trim().toLowerCase() : value,
        z.email()
    ),

    password:
    z.string()
    .min(8)
    .max(30)
    .regex(/[A-Z]/, 'there must be capital letter')
    .regex(/[a-z]/, 'there must be a lowercase too')
    .regex(/[$#@%!(){}*]/, 'there must be a special character')
});