import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import userModel from "@/models/userModel";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password, isSession } = credentials;
        const model = new userModel();

        const user = await model.findOne(email);

        if (!user) {
          throw new Error("El usuario o la contraseña son incorrectos");
        }

        const isPasswordMatch = bcrypt.compareSync(password, user.password);

        if (!isPasswordMatch) {
          throw new Error("El usuario o la contraseña son incorrectos");
        }

        if(!user.is_active) {
            throw new Error("Este usuario fue suspendido. Si crees que es un error, contacta con el administrador");
        }

        if (user.id_role !== 1) {
          throw new Error(
            "Este usuario no tiene permisos para acceder a este sistema"
          );
        }
        
        return user;
      },
    }),
  ],
});
