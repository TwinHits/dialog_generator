#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { DialogGeneratorStack } from "../lib/dialog_generator-stack";

const app = new cdk.App();
new DialogGeneratorStack(app, "dialog_generator_stack",{});