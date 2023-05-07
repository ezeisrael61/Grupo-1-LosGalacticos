let qy = (elemento) => {
      return document.querySelector(elemento);
};

window.addEventListener("load", () => {
      let selectProvincias = document.querySelector("#province");
      let selectLocalidades = document.querySelector("#city");
      const API_BASE_URL = "https://apis.datos.gob.ar/georef/api/";
      let $inputName = qy("#name"),
            $nameErrors = qy("#nameErrors"),
            $inputLastname = qy("#lastname"),
            $lastnameErrors = qy("#lastnameErrors"),
            $form = qy("#form"),
            $file = qy("#image"),
            $fileErrors = qy("#fileErrors"),
            $imgPreview = qy("#img-preview");
      (regExName = /^[a-zA-Z\sñáéíóúü ]{2,30}$/), (regExLastName = /^[a-zA-Z\sñáéíóúü ]{2,20}$/);

      $inputName.addEventListener("blur", () => {
            switch (true) {
                  case !$inputName.value.trim():
                        $nameErrors.innerText = "El campo nombre es obligatorio";
                        $inputName.classList.add("is-invalid");
                        break;
                  case !regExName.test($inputName.value):
                        $nameErrors.innerText = "Nombre invalido";
                        $inputName.classList.add("is-invalid");
                        break;
                  default:
                        $inputName.classList.remove("is-invalid");
                        $inputName.classList.add("is-valid");
                        $nameErrors.innerText = "";
                        break;
            }
      });
      $inputLastname.addEventListener("blur", () => {
            switch (true) {
                  case !$inputLastname.value.trim():
                        $lastnameErrors.innerText = "El campo apellido es obligatorio";
                        $inputLastname.classList.add("is-invalid");
                        break;
                  case !regExLastName.test($inputLastname.value):
                        $lastnameErrors.innerText = "Debes ingresar un apellido válido";
                        $inputLastname.classList.add("is-invalid");
                        break;
                  default:
                        $inputLastname.classList.remove("is-invalid");
                        $inputLastname.classList.add("is-valid");
                        $lastnameErrors.innerText = "";
                        break;
            }
      });

      selectProvincias.addEventListener("change", async (event) => {
            let provinceId = event.target.value;
            try {
                  const response = await fetch(`${API_BASE_URL}localidades?provincia=${provinceId}&campos=id,nombre&max=5000`);
                  const { localidades } = await response.json();
                  //alert(localidades[0].nombre);
                  selectLocalidades.innerHTML = "";

                  const obtenerOption = (nombre) => {
                        return `<option value='${nombre}'>${nombre}</option>`;
                  };

                  localidades.forEach((localidad) => {
                        selectLocalidades.innerHTML += obtenerOption(localidad.nombre);
                  });
            } catch (error) {
                  alert("Hubo un error");
                  console.error(error);
            }
      });

      $form.addEventListener("submit", (event) => {
            event.preventDefault();
            const FORM_ELEMENTS = event.target.elements;

            for (let index = 0; index < FORM_ELEMENTS.length - 1; index++) {
                  const element = FORM_ELEMENTS[index];
                  if (element.value === "" && element.type !== "file") {
                        element.classList.add("is-invalid");
                        element.dispatchEvent(new Event("blur"));
                  }
            }

            let elementosConErrores = document.querySelectorAll(".is-invalid");
            let errores = elementosConErrores.length > 0;

            if (errores) {
                  submitErrors.innerText = "Hay errores en el formulario";
            } else {
                  $form.submit();
            }
      });

      $file.addEventListener("change", () => {
            let filePath = $file.value, //Capturo el valor del input
                  allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i; //Extensiones permitidas
            if (!allowefExtensions.exec(filePath)) {
                  //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
                  $fileErrors.innerHTML = "Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif -.web)";
                  $file.value = "";
                  $imgPreview.innerHTML = "";
                  return false;
            } else {
                  // Image preview
                  console.log($file.files);
                  if ($file.files && $file.files[0]) {
                        let reader = new FileReader();
                        reader.onload = function (e) {
                              $imgPreview.innerHTML = '<img class="img-avatar" src="' + e.target.result + '"/>';
                        };
                        reader.readAsDataURL($file.files[0]);
                        $fileErrors.innerHTML = "";
                        $file.classList.remove("is-invalid");
                  }
            }
      });
});
