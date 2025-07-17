"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the unreal generator!`));

    const prompts = [
      {
        name: "componentName",
        message: "Name of Component"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      console.log(this.props);
    });
  }

  writing() {
    const componentName = this.props.componentName;
    this.fs.copyTpl(this.templatePath(".env"), this.destinationPath(`.env`));
    this.fs.copyTpl(
      this.templatePath(".env.development"),
      this.destinationPath(`.env.development`)
    );
    this.fs.copyTpl(
      this.templatePath(".gitignore"),
      this.destinationPath(`.gitignore`)
    );
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath(`package.json`)
    );
    this.fs.copyTpl(
      this.templatePath("readme.md"),
      this.destinationPath(`readme.md`)
    );
    this.fs.copyTpl(
      this.templatePath("tsconfig.json"),
      this.destinationPath(`tsconfig.json`)
    );
    this.fs.copyTpl(
      this.templatePath("db.js"),
      this.destinationPath(`src/config/db.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("constant.js"),
      this.destinationPath(`src/constants/index.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("BaseController.js"),
      this.destinationPath(`src/controllers/BaseController.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("AuthController.js"),
      this.destinationPath(`src/controllers/AuthController.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("UserController.js"),
      this.destinationPath(`src/controllers/UserController.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("IUser.js"),
      this.destinationPath(`src/interfaces/IUser.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("IFilter.js"),
      this.destinationPath(`src/interfaces/IFilter.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("errorHandler.js"),
      this.destinationPath(`src/middlewares/errorHandler.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("UserModel.ts"),
      this.destinationPath(`src/models/UserModel.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("BaseRepository.js"),
      this.destinationPath(`src/repositories/BaseRepository.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("UserRepository.js"),
      this.destinationPath(`src/repositories/UserRepository.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("AuthRoutes.js"),
      this.destinationPath(`src/routes/AuthRoutes.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("UserRoutes.js"),
      this.destinationPath(`src/routes/UserRoutes.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("UploadRoutes.js"),
      this.destinationPath(`src/routes/UploadRoutes.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("AuthService.js"),
      this.destinationPath(`src/services/AuthService.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("BaseService.js"),
      this.destinationPath(`src/services/BaseService.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("UserService.js"),
      this.destinationPath(`src/services/UserService.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("AppError.js"),
      this.destinationPath(`src/utils/AppError.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("AuthUser.js"),
      this.destinationPath(`src/utils/AuthUser.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("Common.js"),
      this.destinationPath(`src/utils/common.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("EnvSetup.js"),
      this.destinationPath(`src/utils/EnvSetup.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("filter-helper.js"),
      this.destinationPath(`src/utils/filter-helper.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("Validation.js"),
      this.destinationPath(`src/utils/Validation.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("AuthSchema.js"),
      this.destinationPath(`src/validations/AuthSchema.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("UserSchema.js"),
      this.destinationPath(`src/validations/UserSchema.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("app.ts"),
      this.destinationPath(`src/app.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("server.ts"),
      this.destinationPath(`src/server.ts`)
    );
    this.fs.copyTpl(
      this.templatePath("types.d.ts"),
      this.destinationPath(`src/types.d.ts`)
    );
  }

  install() {
    // this.installDependencies();
  }
};
