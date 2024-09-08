/**
 * @fileoverview gRPC-Web generated client stub for login
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v5.26.1
// source: login.proto


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as login_pb from './login_pb'; // proto import: "login.proto"


export class LoginClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'binary';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname.replace(/\/+$/, '');
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorLogin = new grpcWeb.MethodDescriptor(
    '/login.Login/Login',
    grpcWeb.MethodType.UNARY,
    login_pb.LoginRequest,
    login_pb.AuthResponse,
    (request: login_pb.LoginRequest) => {
      return request.serializeBinary();
    },
    login_pb.AuthResponse.deserializeBinary
  );

  login(
    request: login_pb.LoginRequest,
    metadata?: grpcWeb.Metadata | null): Promise<login_pb.AuthResponse>;

  login(
    request: login_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: login_pb.AuthResponse) => void): grpcWeb.ClientReadableStream<login_pb.AuthResponse>;

  login(
    request: login_pb.LoginRequest,
    metadata?: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: login_pb.AuthResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/login.Login/Login',
        request,
        metadata || {},
        this.methodDescriptorLogin,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/login.Login/Login',
    request,
    metadata || {},
    this.methodDescriptorLogin);
  }

  methodDescriptorLoginWithGoogle = new grpcWeb.MethodDescriptor(
    '/login.Login/LoginWithGoogle',
    grpcWeb.MethodType.UNARY,
    login_pb.GoogleLoginRequest,
    login_pb.AuthResponse,
    (request: login_pb.GoogleLoginRequest) => {
      return request.serializeBinary();
    },
    login_pb.AuthResponse.deserializeBinary
  );

  loginWithGoogle(
    request: login_pb.GoogleLoginRequest,
    metadata?: grpcWeb.Metadata | null): Promise<login_pb.AuthResponse>;

  loginWithGoogle(
    request: login_pb.GoogleLoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: login_pb.AuthResponse) => void): grpcWeb.ClientReadableStream<login_pb.AuthResponse>;

  loginWithGoogle(
    request: login_pb.GoogleLoginRequest,
    metadata?: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: login_pb.AuthResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/login.Login/LoginWithGoogle',
        request,
        metadata || {},
        this.methodDescriptorLoginWithGoogle,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/login.Login/LoginWithGoogle',
    request,
    metadata || {},
    this.methodDescriptorLoginWithGoogle);
  }

  methodDescriptorSignUp = new grpcWeb.MethodDescriptor(
    '/login.Login/SignUp',
    grpcWeb.MethodType.UNARY,
    login_pb.SignUpRequest,
    login_pb.AuthResponse,
    (request: login_pb.SignUpRequest) => {
      return request.serializeBinary();
    },
    login_pb.AuthResponse.deserializeBinary
  );

  signUp(
    request: login_pb.SignUpRequest,
    metadata?: grpcWeb.Metadata | null): Promise<login_pb.AuthResponse>;

  signUp(
    request: login_pb.SignUpRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: login_pb.AuthResponse) => void): grpcWeb.ClientReadableStream<login_pb.AuthResponse>;

  signUp(
    request: login_pb.SignUpRequest,
    metadata?: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: login_pb.AuthResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/login.Login/SignUp',
        request,
        metadata || {},
        this.methodDescriptorSignUp,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/login.Login/SignUp',
    request,
    metadata || {},
    this.methodDescriptorSignUp);
  }

}

