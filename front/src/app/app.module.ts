import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// socket
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { socketURL} from 'src/environments/environment';

// import shared and core modules
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment, resetPasswordUrl } from '../environments/environment';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ChatComponent } from './components/chat/chat.component';
import { DisconnectComponent } from './components/disconnect/disconnect.component';
import { availableChatComponent } from './components/available-chat/availableChat.component';

const config: SocketIoConfig = { url: `${socketURL}`, options: {} };
@NgModule({
  declarations: [
    AppComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    ChatComponent,
    availableChatComponent,
    DisconnectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
