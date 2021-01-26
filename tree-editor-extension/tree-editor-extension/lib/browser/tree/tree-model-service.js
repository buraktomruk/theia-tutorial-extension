"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeModelService = void 0;
var tree_schema_1 = require("./tree-schema");
var core_1 = require("@theia/core");
var inversify_1 = require("inversify");
var tree_model_1 = require("./tree-model");
var tree_schema_2 = require("./tree-schema");
var TreeModelService = /** @class */ (function () {
    function TreeModelService(logger) {
        this.logger = logger;
    }
    TreeModelService.prototype.getDataForNode = function (node) {
        return node.jsonforms.data;
    };
    TreeModelService.prototype.getSchemaForNode = function (node) {
        return __assign({ definitions: tree_schema_2.tutorialSchema.definitions }, this.getSchemaForType(node.jsonforms.type));
    };
    TreeModelService.prototype.getSchemaForType = function (type) {
        if (!type) {
            return undefined;
        }
        var schema = Object.entries(tree_schema_2.tutorialSchema.definitions)
            .map(function (entry) { return entry[1]; })
            .find(function (definition) {
            return definition.properties && definition.properties.typeId.const === type;
        });
        if (schema === undefined) {
            this.logger.warn("Can't find definition schema for type " + type);
        }
        return schema;
    };
    TreeModelService.prototype.getUiSchemaForNode = function (node) {
        var type = node.jsonforms.type;
        switch (type) {
            case tree_model_1.CoffeeModel.Type.Exercise:
                return tree_schema_2.exerciseView;
            case tree_model_1.CoffeeModel.Type.Tutorial:
                return tree_schema_2.tutorialView;
            // case CoffeeModel.Type.Command:
            //     return commandView;
            case tree_model_1.CoffeeModel.Type.FileDiff:
                return tree_schema_1.fileDiffView;
            case tree_model_1.CoffeeModel.Type.AutomaticImport:
                return tree_schema_1.automaticImportView;
            case tree_model_1.CoffeeModel.Type.CheckIfFilesExist:
                return tree_schema_1.checkIfFilesExistView;
            case tree_model_1.CoffeeModel.Type.CleanExerciseFolder:
                return tree_schema_1.cleanExerciseFolderView;
            case tree_model_1.CoffeeModel.Type.OpenFile:
                return tree_schema_1.openFileView;
            case tree_model_1.CoffeeModel.Type.TerminalCommands:
                return tree_schema_1.terminalCommandsView;
            case tree_model_1.CoffeeModel.Type.Html:
                return tree_schema_1.htmlView;
            case tree_model_1.CoffeeModel.Type.Image:
                return tree_schema_1.imageView;
            case tree_model_1.CoffeeModel.Type.CommandButton:
                return tree_schema_1.commandButtonView;
            case tree_model_1.CoffeeModel.Type.Hint:
                return tree_schema_1.hintView;
            // case CoffeeModel.Type.Instruction:
            //     return instructionView;      
            default:
                this.logger.warn("Can't find registered ui schema for type " + type);
                return undefined;
        }
    };
    TreeModelService.prototype.getChildrenMapping = function () {
        return tree_model_1.CoffeeModel.childrenMapping;
    };
    TreeModelService.prototype.getNameForType = function (type) {
        return tree_model_1.CoffeeModel.Type.name(type);
    };
    TreeModelService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(core_1.ILogger)),
        __metadata("design:paramtypes", [Object])
    ], TreeModelService);
    return TreeModelService;
}());
exports.TreeModelService = TreeModelService;
//# sourceMappingURL=tree-model-service.js.map