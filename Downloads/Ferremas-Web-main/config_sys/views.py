from django.shortcuts import render, redirect,get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from productos.models import Producto, Categoria


def home(request):
    # Obtenemos productos destacados y todas las categorías para la Home
    productos_destacados = Producto.objects.filter(destacado=True)[:3]
    categorias = Categoria.objects.all()
    return render(request, 'home.html', {
        'productos_destacados': productos_destacados,
        'categorias': categorias
    })
# catálogo
def catalogo(request):
    # Obtenemos todos los productos y categorías para el catálogo
    productos = Producto.objects.all()
    categorias = Categoria.objects.all()
    return render(request, 'tienda/catalogo.html', {
        'productos': productos,
        'categorias': categorias
    })
def detalle_producto(request, pk):
    producto = get_object_or_404(Producto, pk=pk)
    # Mantenemos la subcarpeta "tienda" para ser consistentes con el catálogo
    return render(request, 'tienda/detalle_producto.html', {'producto': producto})

# Vista para las ofertas
def ofertas(request):
    # Aquí podrías obtener productos en oferta
    ofertas = []  # Reemplazar con consulta a la base de datos
    return render(request, 'tienda/ofertas.html', {'ofertas': ofertas})

# Vista para la página de contacto
def contacto(request):
    if request.method == 'POST':
        # Procesar formulario de contacto
        messages.success(request, "Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.")
        return redirect('contacto')
    return render(request, 'tienda/contacto.html')

# Vista para la página "Nosotros"
def nosotros(request):
    return render(request, 'tienda/nosotros.html')

# Vista para los términos y condiciones
def terminos(request):
    return render(request, 'tienda/terminos.html')

# Vista para iniciar sesión
def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, f"Bienvenido, {username}!")
                return redirect('home')
            else:
                messages.error(request, "Usuario o contraseña incorrectos.")
        else:
            messages.error(request, "Usuario o contraseña incorrectos.")
    else:
        form = AuthenticationForm()
    return render(request, 'tienda/login.html', {'form': form})

# Vista para registrarse
def registro(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "¡Registro exitoso! Bienvenido a Ferreemas.")
            return redirect('home')
        else:
            for error in form.errors.values():
                messages.error(request, error)
    else:
        form = UserCreationForm()
    return render(request, 'tienda/registro.html', {'form': form})

# Vista para cerrar sesión
def logout_view(request):
    logout(request)
    messages.success(request, "Has cerrado sesión correctamente.")
    return redirect('home')

# Vista para el perfil de usuario (requiere inicio de sesión)
@login_required
def perfil(request):
    return render(request, 'tienda/perfil.html')

# Vista para los pedidos del usuario (requiere inicio de sesión)
@login_required
def pedidos(request):
    # Aquí podrías obtener los pedidos del usuario actual
    pedidos = []  # Reemplazar con consulta a la base de datos
    return render(request, 'tienda/pedidos.html', {'pedidos': pedidos})

# Vista para el carrito de compras
def carrito(request):
    carrito_sesion = request.session.get('carrito', {})
    
    # ESTO APARECERÁ EN TU CONSOLA/TERMINAL
    print(f"DEBUG: Contenido de la sesion: {carrito_sesion}") 
    
    productos_para_template = []
    total_acumulado = 0

    for p_id, item in carrito_sesion.items():
        producto = get_object_or_404(Producto, pk=p_id)
        subtotal = producto.precio * item['cantidad']
        total_acumulado += subtotal
        
        productos_para_template.append({
            'producto': producto,
            'cantidad': item['cantidad'],
            'subtotal': subtotal,
        })

    print(f"DEBUG: Lista final para el HTML: {productos_para_template}")

    return render(request, 'tienda/ver_carrito.html', {
        'productos': productos_para_template, # <--- Verifica que se llame igual que en el HTML
        'total': total_acumulado
    })
def eliminar_del_carrito(request, producto_id):
    carrito = request.session.get('carrito', {})
    p_id = str(producto_id)
    
    if p_id in carrito:
        del carrito[p_id]
        request.session['carrito'] = carrito
        request.session.modified = True
        messages.success(request, "Producto eliminado correctamente.")
    
    return redirect('carrito')

def actualizar_carrito(request, producto_id):
    if request.method == 'POST':
        cantidad = int(request.POST.get('cantidad', 1))
        carrito = request.session.get('carrito', {})
        p_id = str(producto_id)
        
        if p_id in carrito and cantidad > 0:
            carrito[p_id]['cantidad'] = cantidad
            request.session['carrito'] = carrito
            request.session.modified = True
            messages.success(request, "Cantidad actualizada.")
        else:
            messages.error(request, "Error al actualizar la cantidad.")
            
    return redirect('carrito')

def agregar_al_carrito(request, producto_id):
    # 1. Obtener el carrito actual o crear uno vacío
    carrito_sesion = request.session.get('carrito', {})
    
    # 2. Convertimos el ID a string para evitar errores de guardado en la sesión
    p_id = str(producto_id)
    
    # 3. Lógica de agregar o sumar cantidad
    if p_id not in carrito_sesion:
        carrito_sesion[p_id] = {'cantidad': 1}
    else:
        carrito_sesion[p_id]['cantidad'] += 1
        
    # 4. Guardar los cambios y marcar la sesión como modificada
    request.session['carrito'] = carrito_sesion
    request.session.modified = True  # <--- ESTA LÍNEA ES VITAL
    
    messages.success(request, "Producto añadido al carrito.")
    
    # Redirige a donde el usuario prefiera, por ejemplo al carrito o al catálogo
    return redirect('catalogo')


# Vista para vaciar el carrito
def limpiar_carrito(request):
    request.session['carrito'] = {}
    return redirect('carrito')