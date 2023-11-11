```markdown
# FLASK-CARS

## Instalando o Projeto

1. Navegue até a pasta `FlaskAPP` e execute o comando:

   ```bash
   pip install -r requirements.txt
   ```

2. Execute o comando na raiz do projeto para iniciar o Flask na porta 8000:

   ```bash
   python app.py
   ```

3. Navegue até a pasta `react-cars` e execute:

   ```bash
   npm install
   ```

4. Inicie a aplicação React na porta 3000:

   ```bash
   npm start
   ```

Acesse [localhost:3000](http://localhost:3000) para visualizar a home page do site. Para acessar a área de administração, vá para [localhost:3000/admin](http://localhost:3000/admin). Use as seguintes credenciais:

- Usuário: `adm`
- Senha: `teste_verzel`

Para criar outros usuários:

1. Altere a variável de ambiente `FLASK_APP` para apontar para `app.py`.
2. Execute o comando:

   ```bash
   flask shell
   ```

3. No shell, execute o seguinte script:

   ```python
   from database import db
   from models import User

   user = User(username='nome_usuario')
   user.set_password('senha_usuario')
   db.session.add(user)
   db.commit()
   ```

## API REST em Flask

### Diretório `Routes`

Contém blueprints das rotas utilizadas para realizar as requisições.

### `Models.py`

Contém todas as models utilizadas no projeto.

### `Config.py` e `database.py`

Arquivos gerais de configuração do banco de dados.

### `App.py`

Arquivo de execução do projeto, com uma função `createAPP` para configuração do servidor ou testes unitários.

### Arquivos `database.db` e `test.db`

Arquivos SQLite3 utilizados para o banco de dados. SQLite foi escolhido pela simplicidade e escala menor do projeto. ORM SQLAlchemy foi usado para manipulação de dados.

### Diretório `Tests`

Contém os testes unitários do projeto. Para executar:

```bash
python -m unittest discover
```

## Aplicação React

### Diretórios dentro de `SRC`

- `Components`: Componentes gerais do projeto para gerar páginas front-end.
- `Controllers`: Controladores para realizar requisições à API e aplicar regras de negócio.
- `Styling`: Pastas com CSS para estilização.

## `.env`

Arquivo com variáveis de ambiente, como telefone da empresa, endereço da API, etc.
```

Certifique-se de copiar e colar o conteúdo acima em um arquivo chamado `README.md` no seu repositório do GitHub.