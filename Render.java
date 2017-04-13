import javafx.application.Application;
import javafx.collections.ObservableList;
import javafx.scene.Group;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;
import javafx.stage.Stage;


/**
 * Created by firefly on 4/10/17.
 */
public class Render extends Application{
    private Stage stage;

    public static void main(String args){
        launch(args);
    }

    public void start(Stage theStage){
        initUI(theStage);
    }

    private void initUI(Stage theStage){
        stage = theStage;
        stage.setTitle("AI War");
        Group root = new Group();
        Scene gameScene = new Scene(root);
        stage.setScene(gameScene);

        Canvas gameCanvas = new Canvas(400,400);

        ObservableList<Node> rootChildren = root.getChildren();
        rootChildren.add(gameCanvas);

        GraphicsContext gc = gameCanvas.getGraphicsContext2D();
        //gc.setFill(Color.BLACK);
        gc.fillRect(10,10,10,10);

        gameLoop<Render, Render> gl = new gameLoop();
        gl.setGraphicsContext(gc);
        gl.start();



        stage.show();
    }
}
