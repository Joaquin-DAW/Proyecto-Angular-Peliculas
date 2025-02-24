import { Component } from '@angular/core';
import { FormsModule, FormBuilder,FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  contactoForm: FormGroup;
  mensajeEnviado = false;
  errorEnvio = false;

  constructor(private fb: FormBuilder) {
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$')]],
      apellido: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]], // 9 números
      mensaje: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  enviarMensaje(): void {
    if (this.contactoForm.invalid) return;

    const templateParams = {
      to_name: "Administrador",
      from_name: `${this.contactoForm.value.nombre} ${this.contactoForm.value.apellido}`,
      email: this.contactoForm.value.email,
      telefono: this.contactoForm.value.telefono,
      message: this.contactoForm.value.mensaje,
    };

    emailjs.send('service_8vz167s', 'template_h8poldn', templateParams, 'HtJNZYgIZotgbFx99')
      .then(() => {
        this.mensajeEnviado = true;
        this.errorEnvio = false;
        this.contactoForm.reset(); // Limpia el formulario después del envío
      })
      .catch(() => {
        this.mensajeEnviado = false;
        this.errorEnvio = true;
      });
  }
}