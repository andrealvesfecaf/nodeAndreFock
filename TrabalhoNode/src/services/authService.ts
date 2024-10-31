import { UserRepository } from '../repositories/userRepository';
import { hashPassword, comparePassword } from '../helpers/hashHelper';
import { createSession } from '../helpers/sessionHelper';
import { isValidEmail, isValidName, isValidPassword } from '../helpers/validationHelper';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(name: string, email: string, password: string){
    // Validação dos dados
    if (!isValidName(name)) throw new Error('Nome inválido');
    if (!isValidEmail(email)) throw new Error('Email inválido');
    if (!isValidPassword(password)) throw new Error('Senha inválida');
  
    const passwordhash = hashPassword(password);
  
    try {
      const user = await this.userRepository.addUser(name, email, passwordhash);
      return user;
    } catch (err: any) {
      if (err.code === '23505') throw new Error('Email já está em uso.');
      else throw new Error('Erro no servidor.');
    }
  }
  async loginUser(email: string, senha: string) {
    console.log('ok2')
    const user = await this.userRepository.getEmail(email);
    if (!user) throw new Error('Usuário não encontrado');
    console.log(user.passwordhash)
    console.log(senha)
    const isPasswordValid = comparePassword(senha, user.passwordhash);
    if (!isPasswordValid) throw new Error('Senha incorreta');
    console.log('ok4')
    createSession(user.id);
    return user;
  }
}